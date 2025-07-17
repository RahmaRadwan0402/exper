import Form from '../../../Forms/Form';

export default function CreateUser() {
    return (
        <div className="parent">
            <Form 
            button="Create" 
            buttonStyle={true}
            style={true}
            endpoint="user/create"
            navigate="dashboard/users"
             />
        </div>
    )
}
