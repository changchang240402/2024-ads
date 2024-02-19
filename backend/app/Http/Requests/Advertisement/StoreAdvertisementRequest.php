<?php

namespace App\Http\Requests\Advertisement;

use App\Rules\CustomUserRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreAdvertisementRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'ad_name' => 'required|string|max:255',
            'adgroup_id' => 'required|exists:groups,id',
            'ad_type_id' => 'required|exists:advertisement_types,id',
            'user_id' => ['required', new CustomUserRule],
            'ad_content' => 'required|string|max:255',
            'destination_url' => 'required|url',
            'kpi' => 'required|numeric|between:0.00,99.99',
        ];
    }
}
