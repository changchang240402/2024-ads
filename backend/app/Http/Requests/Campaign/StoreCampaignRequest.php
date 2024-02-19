<?php

namespace App\Http\Requests\Campaign;

use App\Rules\CustomUserRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCampaignRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
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
            'user_id' => ['required', new CustomUserRule],
            'campaign_goal'=> 'required|string|max:255',
            'budget' => 'required|numeric|between:0.00,99999999.99',
            'start_date' => 'required|date_format:Y-m-d',
            'end_date' => [
                'required',
                'date_format:Y-m-d',
                'gte:start_date'
            ],
            'ad_message' => 'required|string|max:255',
            'target_audience' => 'required|string|max:255',
            'distribution_strategy' => 'required|string|max:255',
        ];
    }
}
