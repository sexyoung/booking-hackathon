<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HotelController extends Controller
{
    //
    public function index(Request $request)
	{
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
			'radius' => $radius
		);

		$url = "https://hacker234:8hqNW6HtfU@distribution-xml.booking.com/json/getHotelAvailabilityV2?";

		foreach($params as $key => $val) {
			$url .= "$key=$val&";
		}

		$url = substr($url, 0, -1);
		// echo $url;
		$data = file_get_contents($url);

		$result = json_decode($data, true);

		if(empty($result) || !isset($result['hotels'])) {
			return response()->json(
				array(
					'status' => 'fail',
					'data' => array(),
					'message' => $result['message']
				)
			);
		}

		$parsed_result = array();

		if(isset($result['hotels'])) {
			foreach($result['hotels'] as $hotel) {
				$parsed_result[] = array(
					'price' => $hotel['price'],
					'address' => $hotel['address'],
					'name' => $hotel['hotel_name'],
					'stars' => isset($hotel['stars']) ? $hotel['stars'] : -1, 
					'review_nr' => $hotel['review_nr'],
					'currency_code' => $hotel['hotel_currency_code'],
					'location' => array(
						'lat' => $hotel['location']['latitude'],
						'lng' => $hotel['location']['longitude']
					)
				);
			}
		}
		

		return response()->json(
			array(
				'status' => 'success',
				'data' => $parsed_result
			)
		);
	}
}
