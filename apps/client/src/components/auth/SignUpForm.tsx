'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useSignUp } from '@/hooks/auth';
import { signIn } from 'next-auth/react';
import { usePostHog } from 'posthog-js/react';
import React from 'react';

export function SignUpForm() {
  const posthog = usePostHog();
  const { toast } = useToast();
  const { mutateAsync } = useSignUp();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    let res = null;
    try {
      res = await mutateAsync(data);
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error on sign up',
        description: 'An error has occured on the server',
      });
    }
    if (res) {
      posthog.identify(data.email?.toString());
      await signIn('credentials', {
        callbackUrl: '/todos',
        email: data.email,
        password: data.password,
      });
      return;
    }
    toast({ title: 'Error on sign up', description: '' });
  };
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          placeholder="John Doe"
          required
        />
      </div>
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
