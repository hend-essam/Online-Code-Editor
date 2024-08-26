export const languages = [
  {
    id: 63,
    name: "JavaScript (Node.js 12.14.0)",
    label: "JavaScript (Node.js 12.14.0)",
    value: "javascript",
    extension: "js",
    code: `console.log("Hello World");`,
  },
  {
    id: 45,
    name: "Assembly (NASM 2.14.02)",
    label: "Assembly (NASM 2.14.02)",
    value: "assembly",
    extension: "asm",
    code: `section	.text
    global _start

_start:

    xor	eax, eax
    lea	edx, [rax+len]
    mov	al, 1
    mov	esi, msg
    mov	edi, eax
    syscall

    xor	edi, edi
    lea	eax, [rdi+60]
    syscall

section	.rodata

msg	db 'hello, world', 0xa
len	equ	$ - msg`,
  },
  {
    id: 46,
    name: "Bash (5.0.0)",
    label: "Bash (5.0.0)",
    value: "bash",
    extension: "sh",
    code: `echo "hello, world"`,
  },
  {
    id: 47,
    name: "Basic (FBC 1.07.1)",
    label: "Basic (FBC 1.07.1)",
    value: "basic",
    extension: "bas",
    code: `PRINT "hello, world"`,
  },
  {
    id: 50,
    name: "C (GCC 9.2.0)",
    label: "C (GCC 9.2.0)",
    value: "c",
    extension: "c",
    code: `#include <stdio.h>

int main() {
printf("Hello World");
return 0;
}
`,
  },
  {
    id: 54,
    name: "C++ (GCC 9.2.0)",
    label: "C++ (GCC 9.2.0)",
    value: "cpp",
    extension: "cpp",
    code: `#include <iostream>

int main() {
  std::cout << "Hello World";
  return 0;
}
`,
  },
  {
    id: 86,
    name: "Clojure (1.10.1)",
    label: "Clojure (1.10.1)",
    value: "clojure",
    extension: "clj",
    code: `(println "hello, world")`,
  },
  {
    id: 51,
    name: "C# (Mono 6.6.0.161)",
    label: "C# (Mono 6.6.0.161)",
    value: "csharp",
    extension: "cs",
    code: `namespace HelloWorld
{
  class Hello {		
    static void Main(string[] args)
    {
      System.Console.WriteLine("Hello World");
    }
  }
}
`,
  },
  {
    id: 77,
    name: "COBOL (GnuCOBOL 2.2)",
    label: "COBOL (GnuCOBOL 2.2)",
    value: "cobol",
    extension: "cob",
    code: `IDENTIFICATION DIVISION.
PROGRAM-ID. MAIN.
PROCEDURE DIVISION.
DISPLAY "hello, world".
STOP RUN.`,
  },
  {
    id: 55,
    name: "Common Lisp (SBCL 2.0.0)",
    label: "Common Lisp (SBCL 2.0.0)",
    value: "lisp",
    extension: "lisp",
    code: `(write-line "hello, world")`,
  },
  {
    id: 56,
    name: "D (DMD 2.089.1)",
    label: "D (DMD 2.089.1)",
    value: "d",
    extension: "d",
    code: `import std.stdio;

void main()
{
    writeln("hello, world");
}`,
  },
  {
    id: 57,
    name: "Elixir (1.9.4)",
    label: "Elixir (1.9.4)",
    value: "elixir",
    extension: "exs",
    code: `IO.puts "hello, world"`,
  },
  {
    id: 58,
    name: "Erlang (OTP 22.2)",
    label: "Erlang (OTP 22.2)",
    value: "erlang",
    extension: "erl",
    code: `main(_) ->
io:fwrite("hello, world\\n").`,
  },
  /*   {
    id: 44,
    label: "Executable",
    name: "Executable",
    value: "exe",
    extension: "",
    code:``
  }, */
  {
    id: 87,
    name: "F# (.NET Core SDK 3.1.202)",
    label: "F# (.NET Core SDK 3.1.202)",
    value: "fsharp",
    extension: "fsx",
    code: `printfn "hello, world"`,
  },
  {
    id: 59,
    name: "Fortran (GFortran 9.2.0)",
    label: "Fortran (GFortran 9.2.0)",
    value: "fortran",
    extension: "f90",
    code: `program main
  print *, "hello, world"
end`,
  },
  {
    id: 60,
    name: "Go (1.13.5)",
    label: "Go (1.13.5)",
    value: "go",
    extension: "go",
    code: `package main

import "fmt"

func main() {
    fmt.Println("hello, world")
}`,
  },
  {
    id: 88,
    name: "Groovy (3.0.3)",
    label: "Groovy (3.0.3)",
    value: "groovy",
    extension: "groovy",
    code: `println "hello, world"`,
  },
  {
    id: 61,
    name: "Haskell (GHC 8.8.1)",
    label: "Haskell (GHC 8.8.1)",
    value: "haskell",
    extension: "hs",
    code: `module Main where

main :: IO ()
main = putStrLn "Hello World"`,
  },
  {
    id: 62,
    name: "Java (OpenJDK 13.0.1)",
    label: "Java (OpenJDK 13.0.1)",
    value: "java",
    extension: "java",
    code: `public class Main {
  public static void main(String[] args) {
    System.out.println("hello, world");
  }
}`,
  },
  {
    id: 78,
    name: "Kotlin (1.3.70)",
    label: "Kotlin (1.3.70)",
    value: "kotlin",
    extension: "kt",
    code: `fun main(args: Array<String>){
println("Hello World")
}`,
  },
  {
    id: 64,
    name: "Lua (5.3.5)",
    label: "Lua (5.3.5)",
    value: "lua",
    extension: "lua",
    code: `print("hello, world")`,
  },

  {
    id: 79,
    name: "Objective-C (Clang 7.0.1)",
    label: "Objective-C (Clang 7.0.1)",
    value: "objectivec",
    extension: "m",
    code: `#import <Foundation/Foundation.h>

int main() {
    @autoreleasepool {
        char name[10];
        scanf("%s", name);
        NSString *message = [NSString stringWithFormat:@"hello, %s\\n", name];
        printf("%s", message.UTF8String);
    }
    return 0;
}`,
  },
  {
    id: 65,
    name: "OCaml (4.09.0)",
    label: "OCaml (4.09.0)",
    value: "ocaml",
    extension: "ml",
    code: `print_endline "hello, world"`,
  },
  {
    id: 66,
    name: "Octave (5.1.0)",
    label: "Octave (5.1.0)",
    value: "octave",
    extension: "m",
    code: `printf("hello, world\\n");`,
  },
  {
    id: 67,
    name: "Pascal (FPC 3.0.4)",
    label: "Pascal (FPC 3.0.4)",
    value: "pascal",
    extension: "pas",
    code: `program Hello;
begin
  writeln ('Hello, world.');
end.`,
  },
  {
    id: 85,
    name: "Perl (5.28.1)",
    label: "Perl (5.28.1)",
    value: "perl",
    extension: "pl",
    code: `my $name = <STDIN>;
print "hello, $name";`,
  },
  {
    id: 68,
    name: "PHP (7.4.1)",
    label: "PHP (7.4.1)",
    value: "php",
    extension: "php",
    code: `<?php
    print("hello, world\\n");
?>`,
  },
  {
    id: 43,
    label: "Plain Text",
    name: "Plain Text",
    value: "text",
    extension: "txt",
    code: `hello, world`,
  },
  {
    id: 69,
    name: "Prolog (GNU Prolog 1.4.5)",
    label: "Prolog (GNU Prolog 1.4.5)",
    value: "prolog",
    extension: "pro",
    code: `:- initialization(main).
main :- write('hello, world\\n').`,
  },
  {
    id: 71,
    name: "Python (3.8.1)",
    label: "Python (3.8.1)",
    value: "python",
    extension: "py",
    code: `print("Hello World")`,
  },
  {
    id: 80,
    name: "R (4.0.0)",
    label: "R (4.0.0)",
    value: "r",
    extension: "r",
    code: `cat('Hello World')`,
  },
  {
    id: 72,
    name: "Ruby (2.7.0)",
    label: "Ruby (2.7.0)",
    value: "ruby",
    extension: "rb",
    code: `puts 'Hello World'`,
  },
  {
    id: 73,
    name: "Rust (1.40.0)",
    label: "Rust (1.40.0)",
    value: "rust",
    extension: "rs",
    code: `fn main() {
println!("hello, world");
}`,
  },
  {
    id: 81,
    name: "Scala (2.13.2)",
    label: "Scala (2.13.2)",
    value: "scala",
    extension: "scala",
    code: `object Main {
    def main(args: Array[String]) = {
        val name = scala.io.StdIn.readLine()
        println("hello, "+ name)
    }
}
`,
  },
  {
    id: 83,
    name: "Swift (5.2.3)",
    label: "Swift (5.2.3)",
    value: "swift",
    extension: "swift",
    code: `import Foundation
print("hello world")`,
  },
  {
    id: 74,
    name: "TypeScript (3.7.4)",
    label: "TypeScript (3.7.4)",
    value: "typescript",
    extension: "ts",
    code: `console.log("hello, world");`,
  },
  {
    id: 84,
    name: "Visual Basic.Net (vbnc 0.0.0.5943)",
    label: "Visual Basic.Net (vbnc 0.0.0.5943)",
    value: "vbnet",
    extension: "vb",
    code: `Public Module Program
  Public Sub Main()
      Console.WriteLine("hello, world")
  End Sub
End Module`,
  },
];
