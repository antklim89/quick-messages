import type { S, L } from 'ts-toolbelt';
import { routes } from '~/routes';


type SplitBySlash<T extends string> = S.Split<T, '/'>;
type SelectItemsWithColon<T extends string[]> = L.Select<T, `:${string}`>;
type StripConons<T extends readonly string[]> = T extends Array<`:${infer U}`> ? U : never;
type CretateObject<T extends string> = Record<T, string|number>;

type RouteToObject<T extends string> = CretateObject<StripConons<SelectItemsWithColon<SplitBySlash<T>>>>;

type Routes = typeof routes;


export function getRoute<
    RouteName extends keyof Routes,
    Params extends RouteToObject<Routes[RouteName]['path']>
>(routeName: RouteName, providedParams: Params) {
    const route = routes[routeName];
    if (!route) throw new Error(`There is no route with name ${String(routeName)}`);
    const { path } = route;

    const pathParams = path.match(/:\w+/g);
    if (!pathParams) return path;

    let pathResult: string = path;
    pathParams.forEach((pathParam) => {
        const pathParamKey = pathParam.substring(1);
        const paramsValue = (providedParams as Record<string, string>)[pathParamKey];

        if (!paramsValue) throw new Error(`${pathParamKey} param is required in path ${path}`);

        pathResult = pathResult.replace(pathParam, paramsValue);
    });
    return pathResult;
}
