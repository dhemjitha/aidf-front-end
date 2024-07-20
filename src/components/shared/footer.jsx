import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaWhatsappSquare } from "react-icons/fa";
import React from "react";
import ReactDOM from "react-dom";
import { SocialIcon } from "react-social-icons";

function Footer() {
  return (
    <div className="py-10 ">
      <Separator />
      <br />
      <Avatar>
        <AvatarImage src="https://avatars.githubusercontent.com/u/154544492?v=4" />   
      </Avatar>
      <div className="py-3 justify-between flex">
        <h4 className="font-extrabold">Dulran Hemjitha</h4>
      </div>
      <div>
        <div className="flex space-x-4">
          <SocialIcon
            url="https://github.com/dhemjitha"
            style={{ height: 30, width: 30 }}
          />
          <SocialIcon
            url="https://www.facebook.com/dulran.hemjitha.1?mibextid=LQQJ4d"
            style={{ height: 30, width: 30 }}
          />
          <SocialIcon
            network="whatsapp"
            url="http://wa.me/+94786295820"
            style={{ height: 30, width: 30 }}
          />
          <SocialIcon
            url="https://www.youtube.com/@dhemjitha"
            style={{ height: 30, width: 30 }}
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;

{
  /* <div className="flex justify-between items-center">
          <p className="py-3 font-semibold">Contact Me</p>
          <div className="flex items-center gap-x-2">
            <FaWhatsappSquare className="text-2xl" />
            <p className="text-base pb-6">+94 78 629 5820</p>
          </div>
            
        </div> */
}
