import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    margin-bottom: 20px;

    button {
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: #758bfd;
        color: #fff;
        font-weight: 600;
        cursor: pointer;
    }
`;


const Logout = () => {
    const navigation = useNavigate();

    const logoutUser = () => {
        localStorage.removeItem("token");
        navigation("/login");
    };

    return (
        <Container>
            <button onClick={logoutUser}>Logout</button>
        </Container>
    );
}

export default Logout;