"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify-icon/react";

const typeToColor: Record<string, string> = {
    success: "bg-green-500",
    info: "bg-blue-500",
    warning: "bg-orange-500",
    error: "bg-red-500"
};

const typeToIcon: Record<string, string> = {
    success: "material-symbols:check-circle",
    info: "material-symbols:info",
    warning: "material-symbols:warning",
    error: "material-symbols:error"
};

export default function Notice(props: { type: string; info: string; class?: string }) {
    if (props.type && props.info)
        return (
            <div
                className={`relative ${props.class} ${
                    typeToColor[props.type]
                } rounded-md w-full min-h-12 h-fit empty:px-0 px-4 z-20 cursor-pointer duration-100 `}
            >
                <Icon className="text-2xl mt-3" icon={typeToIcon[props.type]} />
                <span className="absolute text-base mt-3 ml-1">{props.info}</span>
            </div>
        );
}
