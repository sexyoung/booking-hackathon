<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;



class AttractionController extends Controller
{
	protected $_api_key = 'AIzaSyDrsuNPWMH0mBz-IsGg2T3UnppKcjTbMXI';

	public function heatmap() {
		$data = json_decode(file_get_contents(__DIR__ . '/../data/heat_use.json'), true);
		return response()->json(array());
		return response()->json($data);
	}

	public function photo(Request $request, $reference) {
		$api_key = $this-> _api_key;
		$url = "https://maps.googleapis.com/maps/api/place/photo?key=$api_key&photoreference=$reference&maxwidth=400";
		readfile($url);
		// return redirect($url);
	}

	public function getDetail($place_id) {
		$api_key = $this-> _api_key;
		$url = "https://maps.googleapis.com/maps/api/place/details/json?key=$api_key&placeid=$place_id&language=zh-TW";
		$data = json_decode(file_get_contents($url), true);
		if(empty($data) || !isset($data['result']) || empty($data['result'])) {
			return response()->json('error', 500);
		}
		$result = $data['result'];

		$ret_data = array(
			'id' => $result['id'],
			'name' => $result['name'],
			'rating' => $result['rating'],
			'description' => $result['vicinity'],
			// 'geometry' => $result['geometry'],
			'type' => 'place',
			'FBComments' => array()
		);

		// read all comments
		$comments = json_decode(file_get_contents(__DIR__ . "/../data/comments.json"), true);
		if(isset($comments[$ret_data['name']])) {
			$ret_data['FBComments'] = $comments[$ret_data['name']];
		}

		// set image
		if(!empty($ret_data['photos'])) {
			$ret_data['imgUrl'] = '/api/attractions/photo/' . $ret_data['photos'][0]['photo_reference'];
		}

		// friends been here
		$friendsLog = json_decode(file_get_contents(__DIR__ . "/../data/here.json"), true);
		if(isset($friendsLog[$ret_data['name']])) {
			$ret_data['friendsLog'] = $friendsLog[$ret_data['name']];
		}
		return $ret_data;
	}

	public function detail(Request $request, $place_id)
	{

		$api_key = $this-> _api_key;
		$url = "https://maps.googleapis.com/maps/api/place/details/json?key=$api_key&placeid=$place_id&language=zh-TW";
		$data = json_decode(file_get_contents($url), true);
		if(empty($data) || !isset($data['result']) || empty($data['result'])) {
			return response()->json('error', 500);
		}
		$result = $data['result'];

		$ret_data = array(
			'id' => $result['id'],
			'name' => $result['name'],
			'rating' => $result['rating'],
			'description' => $result['vicinity'],
			// 'geometry' => $result['geometry'],
			'type' => 'place',
			'FBComments' => array()
		);

		// read all comments
		$comments = json_decode(file_get_contents(__DIR__ . "/../data/comments.json"), true);
		if(isset($comments[$ret_data['name']])) {
			$ret_data['FBComments'] = $comments[$ret_data['name']];
		}

		// set image
		if(!empty($result['photos'])) {
			$ret_data['imgUrl'] = '/api/attractions/photo/' . $result['photos'][0]['photo_reference'];
		}

		// friends been here
		$friendsLog = json_decode(file_get_contents(__DIR__ . "/../data/here.json"), true);
		if(isset($friendsLog[$ret_data['name']])) {
			$ret_data['friendsLog'] = $friendsLog[$ret_data['name']];
		}

		return response()-> json($ret_data);
	}

	public function index(Request $request)
	{
		
		$data = json_decode(file_get_contents(__DIR__ . '/../data/full_attractions.json'), true);
		// read all comments
		$comments = json_decode(file_get_contents(__DIR__ . "/../data/comments.json"), true);
		
		foreach($data as $index => $d) {
			if(isset($comments[$d['name']])) {
				$data[$index]['FBComments'] = $comments[$d['name']];
			}
		}
		return response()->json($data);
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
				'rating' => isset($attraction['rating']) ? $attraction['rating'] : 3.7,
				'detail' => "/api/attractions/" . $attraction['place_id'],
				'detail_type' => 'object',
				'detail' => $this-> getDetail($attraction['place_id'])
			);
		}
		return response()->json($parsed_result);
	}

    private function search($params)
    {
    	$data = json_decode(file_get_contents(__DIR__ . '/../data/attractions.json'), true);
		return $data;

    	$url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDrsuNPWMH0mBz-IsGg2T3UnppKcjTbMXI';

		if(!empty($params)) {
			foreach($params as $key => $val) {
				$url .= "&$key=$val";
			}
		}
		$url .= "&name=attractions";

    	$next_page_token = false;
    	$full_data = array();
		$data = json_decode(file_get_contents($url), true);

		$next_page_token = false;
		if(isset($data['next_page_token']) && !empty($data['next_page_token'])) {
			$next_page_token = $data['next_page_token'];
		}
		$full_data = array_merge($full_data, $data['results']);

		return $full_data;

    }
}
