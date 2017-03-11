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
			return response()->json(
				array(
					'status' => 'fail',
					'data' => array()
				)
			);
		}

		$parsed_result = array();

		foreach($res['results'] as $attraction) {
			$parsed_result[] = array(
				'location' => $attraction['geometry']['location'],
				'name' => $attraction['name'],
				'rating' => $attraction['rating']
			);
		}
		return response()->json(
			array(
				'status' => 'success',
				'data' => $parsed_result
			)
		);
	}

    private function search($params)
    {
		$url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyBvTV47vAYcRpCq8JP-5NiMHz-Gw8SCiB8';

		if(!empty($params)) {
			foreach($params as $key => $val) {
				$url .= "&$key=$val";
			}
		}
		$url .= "&name=" . urlencode('景點');
		$data = file_get_contents($url);
		return json_decode($data, true);
    }
}
