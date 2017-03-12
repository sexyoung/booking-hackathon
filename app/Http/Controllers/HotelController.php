<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HotelController extends Controller
{
	protected $auth = 'hacker234:8hqNW6HtfU';
    public function photo(Request $request, $hotel_id) {
    	$auth = $this-> auth;
    	$url = "https://$auth@distribution-xml.booking.com/json/bookings.getHotelDescriptionPhotos?hotel_ids=$hotel_id";
    	$data = file_get_contents($url);
    	$result = json_decode($data, true);
    	if(empty($result)) {
    		return response()-> json('', 500);
    	}

    	return redirect($result[0]['url_max300']); 
    }

    public function index(Request $request)
	{
		$auth = $this-> auth;
		$lat = $request-> input('lat');
		$lng = $request-> input('lng');
		$checkin = $request-> input('checkin');
		$checkout = $request-> input('checkout');
		$radius = $request-> input('radius');

		if(empty($radius)) $radius = 1;
		if($radius >= 1000) $radius /= 1000;
		if(empty($checkin)) $checkin = '2017-06-09';
		if(empty($checkout)) $checkout = '2017-06-10';

		$params = array(
			'room1' => 'A,A',
			'output' => 'room_details,hotel_details',
			'latitude' => $lat,
			'longitude' => $lng,
			'checkin' => $checkin,
			'checkout' => $checkout,
			'radius' => $radius,
			'lang' => 'zh-tw'
		);

		$url = "https://$auth@distribution-xml.booking.com/json/getHotelAvailabilityV2?";

		foreach($params as $key => $val) {
			$url .= "$key=$val&";
		}

		$url = substr($url, 0, -1);
		
		// $hotels = json_decode(file_get_contents(__DIR__ . "/../data/hotels.json"), true);
		// return response()->json($hotels);

		$data = file_get_contents($url);

		$result = json_decode($data, true);

		if(empty($result) || !isset($result['hotels'])) {
			return response()->json($result['message'], 500);
		}

		$parsed_result = array();

		// read all comments
		$comments = json_decode(file_get_contents(__DIR__ . "/../data/comments.json"), true);

		$rating_mapping = array(
			'Fabulous' => 4.8,
			'Superb' => 4.4,
			'Very good' => 4.1
		);
		if(isset($result['hotels'])) {
			foreach($result['hotels'] as $hotel) {
				$rate_word = $hotel['review_score_word'];
				$d = array(
					'price' => $hotel['price'],
					'address' => $hotel['address'],
					'name' => $hotel['hotel_name'],
					'stars' => isset($hotel['stars']) ? $hotel['stars'] : -1, 
					'review_nr' => $hotel['review_nr'],
					'currency_code' => $hotel['hotel_currency_code'],
					'location' => array(
						'lat' => $hotel['location']['latitude'],
						'lng' => $hotel['location']['longitude']
					),

					'detail_type' => 'object',
					'detail' => array(
						'type' => 'hotel',
						'rating' => isset($rating_mapping[$rate_word]) ? $rating_mapping[$rate_word] : 3.9,
						'description' => '',
						'name' => $hotel['hotel_name'],
						'imgUrl' => '/api/hotels/photo/' . $hotel['hotel_id'],
						'price' => $hotel['price'],
						'bookingUrl' => 'TODO',
						'FBComments' => array()
					)
				);
				if(isset($comments[$d['name']])) {

					$d['FBComments'] = $comments[$d['name']];
				}
				$parsed_result[] = $d;
			}
		}

		return response()->json($parsed_result);
	}
}
