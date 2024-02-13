import React from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import { db } from '~/server/db';
import DashboardSetup from '~/components/DashboardSetup';


const DashboardPage = async () => {
    const supabase = createServerComponentClient({cookies});

    const {
        data: {user}
    } = await supabase.auth.getUser()

    if(!user) return ; 

    const workspaces = await db.query.workspaces.findFirst({
        where: (workspace, { eq }) => eq(workspace.workspaceOwner, user.id),
    });

    if(!workspaces) return <div
                           className="bg-background
                           h-screen
                           w-screen
                           flex
                           justify-center
                           items-center
                           "
                           >
                            <DashboardSetup></DashboardSetup>
                           </div>


    redirect(`/dashboard/${workspace.id}`);
}

export default DashboardPage