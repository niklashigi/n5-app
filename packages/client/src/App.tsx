import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useMemo } from "react";
import { Switch, Route } from "wouter";

import { trpc } from "./lib/trpc";
import { TodosPage } from "./pages/TodosPage";

function App() {
  const queryClient = useMemo(() => new QueryClient(), []);
  const trpcClient = useMemo(
    () =>
      trpc.createClient({
        links: [
          httpBatchLink({
            url: "http://localhost:3000/trpc",
          }),
        ],
      }),
    [],
  );

  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <div className="max-w-xl mx-auto">
          <div className="py-8 text-center text-3xl font-bold text-gray-700">
            <h1>N5 App</h1>
          </div>
          <div className="max-w-md mx-auto">
            <Switch>
              <Route path="/todos" component={TodosPage} />
              <Route>Page not found!</Route>
            </Switch>
          </div>
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
