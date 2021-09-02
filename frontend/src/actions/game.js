import axios from "axios";

export const loadGames = () => async () => {  
    try {
        const res = await axios.get("/game");
        console.log('SHEEEEEEEEEEEESH');
        console.log(res.data);
        console.log('SHEEEEEEEEEEEESH');
        return res.data;
    } catch (err) {
        return err;
    }
  };