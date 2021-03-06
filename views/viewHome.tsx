import * as React from 'dfv/src/public/dfvReact'
import { viewLayout } from "./viewLayout";
import { HomeIndex } from "../front/home/HomeIndex"
import { dfvFront } from 'dfv/src/public/dfvFront';
import { mana } from '../front/manage/mana';

export const viewHome = {

    index: () =>
        viewLayout.home(
            <script>
                {() => {
                    dfvFront.setBody(new HomeIndex().render());
                }}
            </script>
        ),

    manage: () =>
        viewLayout.manage(<script>
            {() => {
                mana.init();
            }}
        </script>),

}

