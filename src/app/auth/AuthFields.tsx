import { UseFormReturn } from 'react-hook-form'

import {
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form-elements/Form'
import { Input } from '@/components/ui/form-elements/Input'

import { validEmail } from '@/shared/regex'
import { IAuthForm } from '@/shared/types/auth.interface'

interface AuthFieldsProps {
	form: UseFormReturn<IAuthForm, any, undefined>
	isPending: boolean
	isReg?: boolean
}

export function AuthFields({
							   form,
							   isPending,
							   isReg = false
						   }: AuthFieldsProps) {
	return (
		<>
			{isReg && (
				<FormField
					control={form.control}
					name='username'
					rules={{
						required: 'Имя обязательно'
					}}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder='Иван'
									disabled={isPending}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
			<FormField
				control={form.control}
				name='email'
				rules={{
					required: 'Почта обязательна',
					pattern: {
						value: validEmail,
						message: 'Такой почты не существует.'
					}
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								placeholder='ivan@examle.com'
								type='email'
								disabled={isPending}
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name='passwordHash'
				rules={{
					required: 'Пароль обязателен',
					minLength: {
						value: 6,
						message: 'Минимум 6 символов'
					}
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								placeholder='password'
								type='password'
								disabled={isPending}
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	)
}
