import { LangIcon, InfoIcon, LangIconMobile, PlayIcon } from "../assets/icons";
import React, { Component } from "react";

export class Navbar extends Component {
  render() {
    return (
      <div className="w-full flex justify-between items-center pb-4 lg:bg-light lg:max-w-200 lg:pb-default lg:py-3 lg:px-4 lg:rounded-lg ">
        <span className="text-white text-2xl font-1 lg:text-text-dark">
          Shared Expenses
        </span>
        <div className="flex items-center gap-2">
          <InfoIcon className="h-12 w-12 lg:h-16 lg:w-16 duration-200 transition-all hover:brightness-150"></InfoIcon>
          <LangIcon className="h-12 w-12 hidden lg:block lg:h-16 lg:w-16 duration-200 transition-all hover:brightness-150"></LangIcon>
          <LangIconMobile className="h-12 w-12 lg:hidden"></LangIconMobile>
        </div>
      </div>
    );
  }
}

export default Navbar;
