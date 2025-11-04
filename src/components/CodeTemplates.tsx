import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileCode } from "lucide-react";

interface CodeTemplatesProps {
  language: string;
  onSelectTemplate: (code: string) => void;
}

const templates = {
  javascript: {
    "Hello World": `console.log("Hello, World!");`,

    Factorial: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log("Factorial of 5:", factorial(5));`,

    Fibonacci: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}

console.log("Fibonacci of 7:", fibonacci(7));`,

    "Array Functions": `const cekSpekLaptop = (ram) => {
  if (ram >= 8) {
    return "Spek sudah cukup untuk coding.";
  } else {
    return "Minimal punya RTX!";
  }
};

console.log(cekSpekLaptop(4));`,

    "Array Operations": `const numbers = [1, 2, 3, 4, 5];

// Map
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);

// Filter
const evens = numbers.filter(n => n % 2 === 0);
console.log("Evens:", evens);

// Reduce
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum:", sum);`,

    "Promise Example": `const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = false;
      
      if (success) {
        resolve("Data Fetched!");
      } else {
        reject("Error Fetching Data!");
      }
    }, 1000);
  });
};

const run = async () => {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

run();`,
  },
  typescript: {
    "Hello World": `console.log("Hello, World!");`,

    Factorial: `function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log("Factorial of 5:", factorial(5));`,

    Fibonacci: `function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}

console.log("Fibonacci of 7:", fibonacci(7));`,

    "Array Operations": `const numbers: number[] = [1, 2, 3, 4, 5];

// Map
const doubled: number[] = numbers.map(n => n * 2);
console.log("Doubled:", doubled);

// Filter
const evens: number[] = numbers.filter(n => n % 2 === 0);
console.log("Evens:", evens);

// Reduce
const sum: number = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum:", sum);`,

    "Interface Example": `interface User {
  name: string;
  age: number;
  email: string;
}

const user: User = {
  name: "Alice",
  age: 30,
  email: "alice@example.com"
};

console.log(\`User: \${user.name}, Age: \${user.age}\`);`,

    "Generic Function": `function identity<T>(arg: T): T {
  return arg;
}

const result1 = identity<string>("Hello");
const result2 = identity<number>(42);

console.log(result1, result2);`,
  },
  python: {
    "Hello World": `print("Hello, World!")`,
    Factorial: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print("Factorial of 5:", factorial(5))`,
    Fibonacci: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print("Fibonacci of 7:", fibonacci(7))`,
    "List Comprehension": `# List comprehension examples
numbers = [1, 2, 3, 4, 5]

# Square numbers
squares = [n**2 for n in numbers]
print("Squares:", squares)

# Filter evens
evens = [n for n in numbers if n % 2 == 0]
print("Evens:", evens)`,
    "Class Example": `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, I'm {self.name} and I'm {self.age} years old"

person = Person("Alice", 30)
print(person.greet())`,
  },
  cpp: {
    "Hello World": `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    Factorial: `#include <iostream>
using namespace std;

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    cout << "Factorial of 5: " << factorial(5) << endl;
    return 0;
}`,
    "Vector Example": `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> numbers = {1, 2, 3, 4, 5};
    
    cout << "Numbers: ";
    for(int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    return 0;
}`,
    "Class Example": `#include <iostream>
#include <string>
using namespace std;

class Person {
private:
    string name;
    int age;
public:
    Person(string n, int a) : name(n), age(a) {}
    
    void greet() {
        cout << "Hello, I'm " << name << " and I'm " << age << " years old" << endl;
    }
};

int main() {
    Person person("Alice", 30);
    person.greet();
    return 0;
}`,
  },
  java: {
    "Hello World": `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    Factorial: `public class Main {
    public static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
    
    public static void main(String[] args) {
        System.out.println("Factorial of 5: " + factorial(5));
    }
}`,
    "Array Example": `public class Main {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};
        
        System.out.print("Numbers: ");
        for(int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}`,
    "Class Example": `class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void greet() {
        System.out.println("Hello, I'm " + name + " and I'm " + age + " years old");
    }
}

public class Main {
    public static void main(String[] args) {
        Person person = new Person("Alice", 30);
        person.greet();
    }
}`,
  },
};

const CodeTemplates = ({ language, onSelectTemplate }: CodeTemplatesProps) => {
  const currentTemplates = templates[language as keyof typeof templates] || {};

  return (
    <Select
      onValueChange={(value) =>
        onSelectTemplate(
          currentTemplates[value as keyof typeof currentTemplates]
        )
      }
    >
      <SelectTrigger className="w-[180px]">
        <FileCode className="w-4 h-4 mr-2" />
        <SelectValue placeholder="Templates" />
      </SelectTrigger>
      <SelectContent className="bg-popover">
        {Object.keys(currentTemplates).map((templateName) => (
          <SelectItem key={templateName} value={templateName}>
            {templateName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CodeTemplates;
