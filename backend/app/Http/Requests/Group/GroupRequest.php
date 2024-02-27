<?php

namespace App\Http\Requests\Group;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GroupRequest extends FormRequest
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
            'adgroup_name' => 'required|string|max:255',
            'campaign_id' => 'required|exists:campaigns,id',
            'bidding_strategy' => [
                'required',
                Rule::in(config('constants.BIDDING_STRATEGY'))
            ],
            'target_keywords' => 'required|string|max:100',
            'ad_schedule' => 'required|string|max:100',
            'status' => 'required|integer|in:0,1'
        ];
    }
}
