import React, {useEffect, useRef} from "react";
import AppBar from '@mui/material/AppBar';
import { Toolbar } from "@mui/material";
import Typography from "@mui/material";

function Menu(){

    return (
        <AppBar >
            <Toolbar>
                <button>삽입</button>
                <button>수정</button>
                <button>삭제</button>
            </Toolbar>
        </AppBar>
    )
}
export default Menu;