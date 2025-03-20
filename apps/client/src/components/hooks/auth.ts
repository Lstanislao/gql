import { useMutation } from '@tanstack/react-query';

export function useSignUp() {
  return useMutation<any, Error, any>({
    mutationKey: ['sign-in'],
    async mutationFn(input) {
      let data = null;
      try {
        data = await (
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/sign-up`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
          })
        ).json();
      } catch (err) {
        console.log(err);
      }
      // TODO: Do a zod parse
      return data;
    },
  });
}
