const API =
    process.env.NODE_ENV === "production"
        ? "https://carros-pra-aluguel.herokuapp.com"
        : "http://localhost:8000";

export default API;
