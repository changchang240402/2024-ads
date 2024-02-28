<?php

namespace App\Http\Requests\AdvertisementDetail;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class AdvertisementDetailRequest extends FormRequest
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
            'ad_id' => 'required|exists:advertisements,id',
            'platform_id' => 'required|exists:platforms,id',,
            'impressions' => 'required|integer',
            'clicks' => 'required|integer|lte:impressions',
            'ctr' => 'required|numeric|between:0.00,99.99',
            'cpc'=> 'required|numeric|between:0.00,99999999.99',
            'cpa'=> 'required|numeric|between:0.00,99999999.99',,
            'conversions' => 'required|integer|lte:clicks',
            'conversion_rate' => 'required|numeric|between:0.00,99.99'
        ];
    }

    public function messages()
    {
        return [
            'clicks.lte' => 'The number of clicks cannot be greater than impressions .',
            'conversions.lte' => 'The number of conversions cannot be greater than clicks .',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation errors',
            'data' => $validator->errors()
        ], 422));
    }
}
