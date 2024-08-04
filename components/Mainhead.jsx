"use client";

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import BannerDatafromfile from "@/Data/Banner.json";
import Imagesdata from "@/Data/Image.json";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const Mainhead = () => {
  const [Title, settitle] = useState("");
  const [Desc, setdesc] = useState("");
  const [Id, setId] = useState(0);
  const [Image, setimage] = useState("");
  const [clickedImage, setClickedImage] = useState(null);
  const [BannerData, setBannerData] = useState(BannerDatafromfile);

  const UpdateData = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/Update",
        {
          id: Id,
          title: Title,
          description: Desc,
          image: Image,
        },
        {
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        fetchData();
      }
    } catch (error) {
      console.error;
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/Update");
      if (response.status === 200) {
        setBannerData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex gap-10 mt-20">
      {BannerData.map((data) => {
        return (
          <div key={data.id} className=" flex flex-col ">
            <div className="">
              <div
                className={` flex gap-10 items-center p-6`}
                style={{ background: data.bgImage, objectFit: "contain" }}
              >
                <div className=" h-[300px]">
                  <h1 className="text-[40px] font-bold text-white max-sm:text-[24px]">
                    {data.title}
                  </h1>
                  <p className="text-white text-[16px]">{data.description}</p>
                  <button className=" bg-white px-4 py-2 font-semibold mt-7 block">
                    {data.button}
                  </button>
                </div>
                <div>
                  <img
                    src={data.image}
                    alt={data.title}
                    className=" h-[400px] w-[550px] object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
            <Dialog className="">
              <DialogTrigger
                onClick={() => {
                  setId(data.id);
                }}
                className="mt-10 bg-black text-white px-4 py-2"
              >
                Update Data
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="mb-8">Edit Banner</DialogTitle>
                  <DialogDescription className="">
                    <Card className="w-[350px] p-4">
                      <CardContent>
                        <form onSubmit={UpdateData}>
                          <div className="grid w-full items-center gap-4">
                            <div className=" flex gap-5 items-center">
                              <Label className="">Images</Label>
                              <ScrollArea className=" rounded-md w-[200px] h-[50px] ">
                                <div className="flex gap-2 ">
                                  {Imagesdata.map((image) => {
                                    return (
                                      <div className=" flex">
                                        <Avatar
                                          className={` cursor-pointer hover:opacity-55 ${
                                            clickedImage === image.id
                                              ? "opacity-50"
                                              : "opacity-100"
                                          }  `}
                                          key={image.id}
                                          onClick={() => {
                                            setimage(image.img);
                                            setClickedImage(image.id);
                                          }}
                                        >
                                          <AvatarImage src={image.img} />
                                          <AvatarFallback>
                                            {image.id}
                                          </AvatarFallback>
                                        </Avatar>
                                      </div>
                                    );
                                  })}
                                </div>
                                <ScrollBar orientation="horizontal" />
                              </ScrollArea>
                            </div>

                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="name">Title</Label>
                              <Input
                                value={Title}
                                id="name"
                                onChange={(e) => settitle(e.target.value)}
                                placeholder="Change the Title Here"
                                required
                              />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="name">Description</Label>
                              <Input
                                value={Desc}
                                id="description"
                                onChange={(e) => setdesc(e.target.value)}
                                placeholder="Change the Description Here"
                                required
                              />
                            </div>

                            <DialogClose>
                              <Button className="">Change</Button>
                            </DialogClose>
                          </div>
                        </form>
                      </CardContent>
                      <CardFooter>
                        <p className="font-bold">Click Button to see Changes</p>
                      </CardFooter>
                    </Card>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        );
      })}
    </div>
  );
};

export default Mainhead;
