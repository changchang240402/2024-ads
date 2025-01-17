<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $role = User::where('id', auth()->id())
                    ->where('status', '=', config('constants.STATUS_USER')['in use'])
                    ->value('role');
        if ($role === config('constants.ROLE')[1]) {
            return $next($request);
        };

        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
