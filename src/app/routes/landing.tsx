import { Link } from "react-router-dom"
import {
  ArrowUpRight,
  List,
  NotebookPen,
  SquareCheckBig,
  Timer,
} from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/ui/icons"

export function LandingRoute() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <div className="section relative flex flex-col items-center justify-center gap-y-20">
        <div className="flex w-full flex-col items-center gap-y-12 text-center">
          <h1 className="text-responsive-base font-bold leading-[1] md:text-responsive-lg">
            Elevate Productivity
          </h1>
          <p className="max-w-screen-md text-muted-foreground md:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime odit
            excepturi sapiente laboriosam suscipit tenetur ipsum!
          </p>
        </div>
        <div className="flex items-center justify-center gap-x-4">
          <Button asChild>
            <Link to="/signup">Let's start</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/login">Already a user?</Link>
          </Button>
        </div>
        <div className="bg-gradient absolute left-1/2 top-1/2 -z-10 size-[256px] translate-x-full rounded-full bg-muted-foreground/50 blur-[1024px]" />
        <div className="bg-gradient absolute left-0 top-0 -z-10 size-[256px] -translate-y-1/2 rounded-full bg-muted-foreground/50 blur-[1024px]" />
      </div>

      {/* Features */}
      <div id="features" className="section space-y-12">
        <div className="relative flex w-full justify-center text-muted-foreground">
          <span className="bg-background px-4 text-xs font-semibold uppercase tracking-[0.2rem]">
            Features
          </span>
          <span className="absolute left-1/2 top-1/2 -z-10 h-px w-72 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-muted-foreground md:w-96" />
        </div>
        <div className="flex flex-col items-center gap-y-8">
          <h2 className="text-center text-4xl font-bold">
            Mini apps to keep you productive
          </h2>
          <Tabs
            defaultValue="task-tracker"
            className="flex w-full flex-col items-center gap-y-4"
          >
            <TabsList>
              <TabsTrigger value="task-tracker">Task</TabsTrigger>
              <TabsTrigger value="pomodoro-timer">Pomodoro</TabsTrigger>
              <TabsTrigger value="keep-notes">Notes</TabsTrigger>
              <TabsTrigger value="make-list">List</TabsTrigger>
            </TabsList>
            <TabsContent value="task-tracker" className="w-full">
              <div className="flex h-[1000px] w-full flex-col justify-center gap-8 md:h-[500px] md:flex-row">
                <div className="h-2/5 w-full space-y-8 p-4 text-lg md:h-full md:w-2/5 md:p-8">
                  <div className="space-y-4">
                    <div className="w-fit rounded-xl border border-muted p-4 text-muted-foreground">
                      <SquareCheckBig size={24} />
                    </div>
                    <h3 className="text-2xl font-bold">Task Tracker App</h3>
                    <p className="text-muted-foreground">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatum, explicabo.
                    </p>
                  </div>
                  <ul className="list-disc space-y-2 pl-4 text-muted-foreground">
                    <li>Feature1</li>
                    <li>Feature2</li>
                    <li>Feature3</li>
                    <li>Feature4</li>
                  </ul>
                </div>
                <div className="h-2/5 w-full bg-blue-900 md:h-full md:w-2/5"></div>
              </div>
            </TabsContent>
            <TabsContent value="pomodoro-timer" className="w-full">
              <div className="flex h-[1000px] w-full flex-col justify-center gap-8 md:h-[500px] md:flex-row">
                <div className="h-2/5 w-full space-y-8 p-4 text-lg md:h-full md:w-2/5 md:p-8">
                  <div className="space-y-4">
                    <div className="w-fit rounded-xl border border-muted p-4 text-muted-foreground">
                      <Timer size={24} />
                    </div>
                    <h3 className="text-2xl font-bold">Pomodoro Timer</h3>
                    <p className="text-muted-foreground">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatum, explicabo.
                    </p>
                  </div>
                  <ul className="list-disc space-y-2 pl-4 text-muted-foreground">
                    <li>Feature1</li>
                    <li>Feature2</li>
                    <li>Feature3</li>
                    <li>Feature4</li>
                  </ul>
                </div>
                <div className="h-2/5 w-full bg-blue-900 md:h-full md:w-2/5"></div>
              </div>
            </TabsContent>
            <TabsContent value="keep-notes" className="w-full">
              <div className="flex h-[1000px] w-full flex-col justify-center gap-8 md:h-[500px] md:flex-row">
                <div className="h-2/5 w-full space-y-8 p-4 text-lg md:h-full md:w-2/5 md:p-8">
                  <div className="space-y-4">
                    <div className="w-fit rounded-xl border border-muted p-4 text-muted-foreground">
                      <NotebookPen size={24} />
                    </div>
                    <h3 className="text-2xl font-bold">Keep Notes</h3>
                    <p className="text-muted-foreground">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatum, explicabo.
                    </p>
                  </div>
                  <ul className="list-disc space-y-2 pl-4 text-muted-foreground">
                    <li>Feature1</li>
                    <li>Feature2</li>
                    <li>Feature3</li>
                    <li>Feature4</li>
                  </ul>
                </div>
                <div className="h-2/5 w-full bg-blue-900 md:h-full md:w-2/5"></div>
              </div>
            </TabsContent>
            <TabsContent value="make-list" className="w-full">
              <div className="flex h-[1000px] w-full flex-col justify-center gap-8 md:h-[500px] md:flex-row">
                <div className="h-2/5 w-full space-y-8 p-4 text-lg md:h-full md:w-2/5 md:p-8">
                  <div className="space-y-4">
                    <div className="w-fit rounded-xl border border-muted p-4 text-muted-foreground">
                      <List size={24} />
                    </div>
                    <h3 className="text-2xl font-bold">Make List</h3>
                    <p className="text-muted-foreground">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatum, explicabo.
                    </p>
                  </div>
                  <ul className="list-disc space-y-2 pl-4 text-muted-foreground">
                    <li>Feature1</li>
                    <li>Feature2</li>
                    <li>Feature3</li>
                    <li>Feature4</li>
                  </ul>
                </div>
                <div className="h-2/5 w-full bg-blue-900 md:h-full md:w-2/5"></div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Contribute */}
      <div id="contribute" className="section-no-height space-y-12">
        <div className="relative flex w-full justify-center text-muted-foreground">
          <span className="bg-background px-4 text-xs font-semibold uppercase tracking-[0.2rem]">
            Contribute
          </span>
          <span className="absolute left-1/2 top-1/2 -z-10 h-px w-72 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-muted-foreground md:w-96" />
        </div>
        <div className="flex flex-col items-center gap-y-8">
          <h2 className="text-center text-4xl font-bold">
            Help us to become better with your contribution
          </h2>
          <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row md:items-start md:gap-8">
            <div className="flex w-full flex-col gap-y-4 rounded-3xl border border-border p-4 md:w-2/5 md:p-8">
              <h3 className="text-2xl font-semibold">Bugs/Issues Reporting</h3>
              <p className="text-muted-foreground">
                Found any bugs or issues in the website?
              </p>
              <Button asChild className="w-full">
                <Link to="#report-issue">
                  Report an issue <ArrowUpRight size={20} className="ml-2" />
                </Link>
              </Button>
            </div>
            <div className="flex w-full flex-col gap-y-4 rounded-3xl border border-border p-4 md:w-2/5 md:p-8">
              <h3 className="text-2xl font-semibold">
                Contribute to the project
              </h3>
              <p className="text-muted-foreground">
                Suggestions about existing feature or any new features
              </p>
              <Button asChild className="w-full font-mono font-bold">
                <Link to="#contribute">
                  <Icons.github size={20} className="mr-2" /> github/use-daily{" "}
                  <ArrowUpRight size={20} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-40 w-full border-t border-border text-sm">
        <div className="mx-auto max-w-screen-xl px-4 py-4 md:px-8 md:py-8">
          <div className="flex flex-wrap gap-16 md:flex-row md:gap-32">
            <div className="flex w-full flex-shrink-0 flex-col gap-2 md:w-fit">
              <Link to="/" className="text-2xl font-bold text-foreground">
                use-daily
              </Link>
              <p className="text-muted-foreground">Founded @2024</p>
            </div>
            <div className="flex flex-col gap-2 md:ml-auto">
              <span className="text-secondary-foreground">Links</span>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link to="#feature">Features</Link>
                </li>
                <li>
                  <Link to="#feature">Contribute</Link>
                </li>
                <li>
                  <Link to="#feature">Github</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-secondary-foreground">Socials</span>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link to="#feature">Twitter</Link>
                </li>
                <li>
                  <Link to="#feature">Facebook</Link>
                </li>
                <li>
                  <Link to="#feature">Youtube</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-secondary-foreground">Socials</span>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link to="#feature">Twitter</Link>
                </li>
                <li>
                  <Link to="#feature">Facebook</Link>
                </li>
                <li>
                  <Link to="#feature">Youtube</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
