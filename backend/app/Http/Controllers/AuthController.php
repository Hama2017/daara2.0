<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
   /* public function login(Request $request)
    {
        try {
            // Get user credentials from the request
            $credentials = $request->only('emailUser', 'mdpUser');
    
            // Attempt to log the user in
            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                
                // Create an access token for the authenticated user
                $token = $user->createToken('LaravelAuthApp')->accessToken;
                
                // Return a successful response with the user and token
                return response()->json([
                    'user' => $user,
                    'token' => $token
                ]);
            } else {
                // If authentication fails, return an unauthorized response
                return response()->json(['message' => 'Invalid credentials'], 401);
            }
        } catch (\Exception $e) {
            // Handle any exceptions and return an error message
            return response()->json(['message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    } */
    
    public function login(Request $request)
    {
        $request->validate([
            'emailUser' => 'required|email',
            'mdpUser' => 'required'
        ]);

        $user = User::where('emailUser', $request->emailUser)->first();

        if (!$user || !Hash::check($request->mdpUser, $user->mdpUser)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('user-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }


    // Déconnexion
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
