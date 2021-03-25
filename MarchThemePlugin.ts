import * as Parkmyst from "./library/parkmyst-1";

export class BasicMarchTheme extends Parkmyst.Theme {
    protected name: string = "BasicMarchTheme";
    protected description: string = "MarchTheme is a theme system for a basic March 15 game!";

    protected outputTemplates: Parkmyst.OutputTemplates = {
        notYet: {
            template: `<span> - </span>`,
            example: {
                yes: "no"
            }
        }
    };

    protected htmlHeader: string = `<header>
    My game header
</header>`;

    protected htmlFooter: string = `<header>
    My game footer
</header>`;

    protected style: string = `span.secret {
    color: red;
}`;
}

Parkmyst.registerTheme(new BasicMarchTheme());