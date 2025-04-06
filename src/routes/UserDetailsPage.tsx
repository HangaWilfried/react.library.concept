import { useParams } from "react-router";

export default function UserDetailsPage() {
    const { id } = useParams();

    return (
        <div>
            <h1>User Details Page</h1>
            <p>This is the user details page. with params {id}</p>
        </div>
    );
}