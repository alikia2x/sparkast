"use client";

import { RecoilRoot } from "recoil";
import Homepage from "../components";

export default function Home() {
    return (
        <RecoilRoot>
            <Homepage />
        </RecoilRoot>
    );
}
