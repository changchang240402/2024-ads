<?php

namespace App\Http\Requests\Campaign;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreCampaignRequest extends FormRequest
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
            'campaign_name' => 'required|string|max:255',
            'campaign_goal' => 'required|string|max:255',
            'budget' => 'required|numeric|between:0.00,99999999.99',
            'start_date' => 'required|date_format:d-m-Y',
            'end_date' => [
                'required',
                'date_format:d-m-Y',
                'gte:start_date'
            ],
            'ad_message' => 'required|string|max:255',
            'human' => [
                'required',
                Rule::in(config('constants.HUMAN_OBJECT'))
            ],
            'start_age' => 'required|integer|between:3,100',
            'end_age' => [
                'required',
                'integer',
                'between:3,100',
                'gte:start_age'
            ],
            'activities' => 'required|string|max:100',
            'distribution_strategy' => 'required|string|max:255',
        ];
    }

    public function messages()
    {
        return [
            'end_date.gte' => 'End date must be some time after start date.',
            'end_age.gte' => 'End date must be some time after start date.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation errors',
            'data' => $validator->errors()
        ], 400));
    }
}
