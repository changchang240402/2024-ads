<?php

namespace App\Rules;

use App\Models\User;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CustomUserRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $exists = User::where('id', $value)
        ->where('role', 'user')
        ->where('status', 0)
        ->exists();

        if (!$exists) {
        $fail('You have no authority over the campaign.');
        }
    }
}
