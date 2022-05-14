import StandardLayout from "../layout/StandardLayout";

const ProfilePage = () =>{

    return(
        <StandardLayout>
            <main className="main">
                <h1>Profile page</h1>
                <h3>Petar Petrovic</h3>
                <h3>26 years old</h3>
                <h3>90kg</h3>
            </main>
        </StandardLayout>
    );
}
export default ProfilePage;