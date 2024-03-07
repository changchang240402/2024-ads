import Label from '../../Label/Label'

const AdsAtribute = ({ label, content }) => {
    return (
        <div className="flex flex-col justify-start items-start max-w-96">
            <Label label={label} />
            <p className='mx-16'>{content}</p>
        </div>
    )
}

export default AdsAtribute
