import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { DividerVerticalIcon } from '@radix-ui/react-icons';
import { useLoginController } from "./useLoginController";

export function Login() {
  const { handleSubmit, register, errors, isPending } = useLoginController();

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full h-full flex items-center justify-center flex-col">
        <header className="w-full max-w-[504px] flex flex-col items-center justify-center px-8">
          <span className="text-zinc-800 text-base font-medium">Bem-vindo(a) ao</span>

          <h1
            className="mt-1 text-[32px] font-semibold text-zinc-800 tracking-[-1px] flex items-center gap-2"
          >
            <span className="font-light">YOUR RESTAURANT</span>
            <DividerVerticalIcon />
            <div>
              X<span className="font-light">FOODS</span>
            </div>
          </h1>

          <form
            onSubmit={handleSubmit}
            className="w-full mt-[60px] flex flex-col gap-8"
          >
            <Input
              type="email"
              placeholder="E-mail"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              type="password"
              placeholder="Senha"
              error={errors.password?.message}
              {...register('password')}
            />

            <Button type="submit" className="mt-2" isLoading={isPending}>
              Fazer Login
            </Button>
          </form>
        </header>
      </div>

      <footer className="border bg-white">
        <div className="font-semibold px-2 text-[17px]">
          Developed by <span className="font-bold">ViaTech®</span>
        </div>
      </footer>
    </div>
  );
}
