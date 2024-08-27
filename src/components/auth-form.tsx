"use client";
import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { logIn, signUp } from '@/actions/actions'
import AuthFormBtn from './auth-formbtn'
import { useFormState } from 'react-dom';

type AuthFormProps = {
  type: 'logIn' | 'signUp'
}

export default function AuthForm({type}: AuthFormProps) {
  const [signupError, dispatchSignUp] = useFormState(signUp, undefined);
  const [logInError, dispatchlogIn] = useFormState(logIn, undefined);
  return (
    <form 
    action={ type === "logIn" ? dispatchlogIn : dispatchSignUp}
    >
      <div className='space-y-1'>
        <Label htmlFor="email">Email</Label>
        <Input  id="email" name='email' type="email" required maxLength={100}/>

      </div>
      <div className='space-y-1 mb-4 mt-2'>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required maxLength={100}/>
      </div>
      <AuthFormBtn type={type}/>
      {signupError && <p className='text-red-500 text-sm mt-2'>{signupError.message}</p>}
      {logInError && <p className='text-red-500 text-sm mt-2'>{logInError.message}</p>}
    </form>
  )
}
