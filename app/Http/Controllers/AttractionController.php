<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AttractionController extends Controller
{
	public function index(Request $request)
	{


		$lat = $request-> input('lat');
		$lng = $request-> input('lng');
		$radius = $request-> input('radius'); // in m

		$params = array(
			'location' => "$lat,$lng",
			'radius' => $radius
		);
		$res = $this-> search($params);

		if(empty($res)) {
			return response()->json('error', 500);
		}

		$parsed_result = array();

		foreach($res as $attraction) {
			$parsed_result[] = array(
				'location' => $attraction['geometry']['location'],
				'name' => $attraction['name'],
				'rating' => $attraction['rating']
			);
		}
		return response()->json(
			$parsed_result
		);
	}

    private function search($params)
    {
    	$data = json_decode(file_get_contents(__DIR__ . '/../data/attractions.json'), true);
		return $data;

    	$url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDsmyI6lT8VxDqiGN19T7HQRuGZtqeiehg';

		if(!empty($params)) {
			foreach($params as $key => $val) {
				$url .= "&$key=$val";
			}
		}
		$url .= "&name=" . urlencode('景點');

    	$next_page_token = false;
    	$full_data = array();
    	do {
    		$data = json_decode(file_get_contents($url), true);

    		$next_page_token = false;
    		if(isset($data['next_page_token']) && !empty($data['next_page_token'])) {
    			$next_page_token = $data['next_page_token'];
    		}
    		$full_data = array_merge($full_data, $data['results']);

    	} while($next_page_token);
		return $full_data;

    }
}
