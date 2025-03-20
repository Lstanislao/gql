'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { signIn } from 'next-auth/react';
import { usePostHog } from 'posthog-js/react';
import React from 'react';

export function SignInForm() {
  const posthog = usePostHog();
  const { toast } = useToast();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    let res = null;
    try {
      posthog.identify(data.email?.toString());
      await signIn('credentials', { callbackUrl: '/todos', ...data });
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error on sign in',
        description: 'An error has occured on the server',
      });
    }
    console.log(res);
    if (res) {
      toast({ title: 'Welcome back 👋🏻' });
      // cambiar la ruta
      return;
    }
    toast({ title: 'Error on sign in', description: '' });
  };
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="name@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
}
