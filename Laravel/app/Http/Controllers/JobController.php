<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class JobController extends Controller
{
    public function AllJob(Request $request){

        $data=DB::table('job')
            ->where('status',1)
            ->get();
            
        if($data){
            return response()->json($data, 200);
        }else{
            return response()->json(['code'=>401, 'message' => 'No Job Found!']);
        }
    }

    public function CreateNewJob(Request $request){
        $validator = Validator::make($request->all(),
            [
                'company' => 'required',
                'title' => 'required',
                'location' => 'required',
                'salary' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }else{

            $data=array();
            $data['company']=$request->company;
            $data['title']=$request->title;
            $data['location']=$request->location;
            $data['salary']=$request->salary;

            $user=DB::table('job')->insert($data);

            if($user){
                return response()->json(['code'=>200, 'message' => 'OK']);
            }else{
                return response()->json(['code'=>401, 'message' => 'Something going wrong!']);
            }
        }
    }

    public function UpdateJob(Request $request){
        $validator = Validator::make($request->all(),
            [
                'id' => 'required',
                'company' => 'required',
                'title' => 'required',
                'location' => 'required',
                'salary' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }else{

            $data=array();
            $data['company']=$request->company;
            $data['title']=$request->title;
            $data['location']=$request->location;
            $data['salary']=$request->salary;

            $update= DB::table('job')
                ->where('id',$request->id)
                ->update($data);

            if($update){

                return response()->json(['code'=>200, 'message' => 'OK']);
                
            }else{

                return response()->json(['code'=>401, 'message' => 'Something going wrong!']);
            }
        }
    }

    public function DeleteJob(Request $request){
        $validator = Validator::make($request->all(),
            [
                'id' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }else{

            $data=array();
            $data['status']=0;

            $update= DB::table('job')
                ->where('id',$request->id)
                ->update($data);

            if($update){

                return response()->json(['code'=>200, 'message' => 'OK']);
                
            }else{

                return response()->json(['code'=>401, 'message' => 'Something going wrong!']);
            }
        }
    }
}
