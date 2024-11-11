"use client"

import {Chats} from "@/app/chats/Chats";
import Header from "@/app/chats/Header";
import Head from "next/head";
import MessageForm from "@/app/chats/MessagesForm";
import {useProfile} from "@/hooks/useProfile";
import Messages from "@/app/chats/Messages";
import {ChatProvider} from "./ChatContext";
import styles from './Chat.module.scss';



export default function Home() {
    const {user} = useProfile()
    if (!user) return ;

    return (
        <html>
        <Head>
            <title>Hola</title>
            <meta name="description" content="Best messanger"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </Head>
        <body>
        {/*Весь экран*/}
        <div className=" h-screen flex w-screen relative">
            <ChatProvider>
                {/*Чаты*/}
                <div
                     className={`sm:block sm:w-1/3 bg-white h-full absolute sm:relative`}>
                    <div className={"flex flex-row  w-full h-16 pl-4 focus:outline-none items-center gap-2 border-b"}>
                        <span> Hola, {user.displayName}</span>
                        <input type="text"
                               className={"rounded-lg focus:outline-none mr-4 bg-white border pl-3"}
                               placeholder="search"/>
                    </div>
                    <Chats/>
                </div>

                {/*Page*/}
                <div className={styles.wrapper}>
                    {/*Header*/}
                    <Header/>
                    {/*Messages*/}
                    <Messages/>
                    {/*MessageForm*/}
                    <div className=" flex justify-center">
                        <MessageForm/>
                    </div>
                </div>
            </ChatProvider>
        </div>
        </body>
        </html>

    )
}


