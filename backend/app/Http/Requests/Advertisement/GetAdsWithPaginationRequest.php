<?php

namespace App\Http\Requests\Advertisement;

use Illuminate\Foundation\Http\FormRequest;

class GetAdsWithPaginationRequest extends FormRequest
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
            'page' => 'integer|min:1',
            'per_page' => 'integer|min:1',
            'sortBy' => 'nullable',
            'order' => 'nullable',
            'searchBy' => 'nullable|in:ad_name,ad_content',
            'date' => 'nullable',
            'search' => 'nullable|',
            'status' => 'nullable|in:active,paused',
            'platform' => 'nullable',
        ];
    }
}
