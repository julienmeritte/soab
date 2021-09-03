import axios from "axios";

export const loadGames = () => async () => {  
    try {
        const res = await axios.get("/game");
        console.log(res.data);
        return res.data;
    } catch (err) {
        return err;
    }
  };