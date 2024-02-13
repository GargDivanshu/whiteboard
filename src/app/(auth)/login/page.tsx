'use client'
import { useRouter } from 'next/navigation'
import React, {useState} from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import {FormSchema} from '~/lib/type.ts'
import {
    Form,
    FormDescription, 
    FormField,
    FormItem, 
    FormControl,
    FormMessage
} from '~/components/ui/form'
import {Input} from '~/components/ui/input'
import {Button} from '~/components/ui/button' 
import Link from 'next/link'
import Loader from './../../../components/global/Loader';
import {actionLoginUser} from '~/server/auth-actions'

const LoginPage = () => {
    const router = useRouter()
    const [error, setError] = useState('')

    const form = useForm<z.infer<typeof FormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(FormSchema),
        defaultValues: {email: '', password: ''},
    })

    const isLoading = form.formState.isSubmitting;
    const onSubmit = SubmitHandler<z.infer<typeof FormSchema>> = async (
        formData : z.infer<typeof FormSchema>
    ) => {
        const {error} = await actionLoginUser(formData)
        if(error){
            form.reset();
            setError(error.message)
        }
        router.replace('/dashboard')
    };


    return (
        <Form {...form}>
            <form 
            onChange={() => {
                if(error) setError('')
            }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
            >
                <Link href="/" className="w-full justify-left flex items-center">LOGO</Link>
                <FormDescription
          className="
        text-foreground/60"
        >
          An all-In-One Collaboration and Productivity Platform
        </FormDescription>
        <FormField
          disabled={isLoading}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <FormMessage>{error}</FormMessage>}
        <Button
          type="submit"
          className="w-full p-6"
          size="lg"
          disabled={isLoading}
        >
          {!isLoading ? 'Login' : <Loader />}
        </Button>
        <span className="self-container">
          Dont have an account?{' '}
          <Link
            href="/signup"
            className="text-primary"
          >
            Sign Up
          </Link>
        </span>
            </form>
        </Form>
    )
}

export default LoginPage