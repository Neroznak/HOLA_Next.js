import {useState} from "react";
import {useAuthForm} from "@/app/auth/useAuthForm";
import styles from './Auth.module.scss';
import logo from "../../../public/assets/images/logo.png";
import Image from "next/image";
import {Form} from "@/components/ui/form-elements/Form";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/Card";
import {AuthFields} from "@/app/auth/AuthFields";
import {Button} from "@/components/ui/Button";

export function Auth() {
    const [isReg, setIsReg] = useState(false);
    const {onSubmit, form, isPending} = useAuthForm(isReg)

    return (
        <div className={styles.wrapper}>
            <Card className={styles.card}>
                <CardHeader className={styles.card}>
                    <CardTitle>
                        <div className={styles.logo}>
                            <Image
                                src={logo}
                                width={208}
                                height={150}
                                alt={"logo"}
                            ></Image>
                        </div>
                        {isReg ? 'Создать аккаунт' : 'Войти в аккаунт'}
                    </CardTitle>
                    <CardDescription>
                        Войдите или создайте учетную запись, чтобы общаться!
                    </CardDescription>
                </CardHeader>
                <CardContent className={styles.content}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <AuthFields
                                form={form}
                                isPending={isPending}
                                isReg={isReg}
                            />

                            <Button disabled={isPending}>Продолжить</Button>
                        </form>
                    </Form>
                    {/*<Social />*/}
                </CardContent>
            </Card>

        </div>
    )
}