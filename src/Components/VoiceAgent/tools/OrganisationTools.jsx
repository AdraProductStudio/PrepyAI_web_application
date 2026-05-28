
import { useWebMCP } from '@mcp-b/react-webmcp';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'Services/axiosInstance';

/**
 * ORGANISATION WebMCP TOOLS
 * Mount inside any Organisation layout/page.
 */
const OrganisationTools = () => {
    const navigate = useNavigate();

    useWebMCP({
        name: 'org_navigate',
        description: 'Navigate to any organisation dashboard page such as home, pricing_plan, profile.',
        inputSchema: {
            route: z.string().describe('Route e.g. /organisation_dashboard/home'),
        },
        handler: async ({ route }) => {
            navigate(route);
            return { success: true, navigated_to: route };
        },
    });

    useWebMCP({
        name: 'org_fetch_info',
        description: 'Get organisation information like name, plan, and admin count.',
        inputSchema: {},
        handler: async () => {
            const res = await axiosInstance.get('/organization/get_organization_info');
            if (res.data.success) {
                navigate('/organisation_dashboard/home');
                return { success: true, info: res.data.data };
            }
            return { success: false, message: 'Could not load organisation info' };
        },
    });

    useWebMCP({
        name: 'org_fetch_admins',
        description: 'Get list of all admins in the organisation.',
        inputSchema: {},
        handler: async () => {
            const res = await axiosInstance.post('/organization/get_admin_list');
            if (res.data.success && res.data.data?.length) {
                return {
                    success: true,
                    total: res.data.data.length,
                    admins: res.data.data.map((a) => ({
                        id: a.admin_id,
                        name: `${a.first_name} ${a.last_name}`,
                        email: a.email_id,
                    })),
                };
            }
            return { success: false, message: 'No admins found' };
        },
    });

    useWebMCP({
        name: 'org_invite_admin',
        description: 'Invite a new admin to the organisation by email.',
        inputSchema: {
            email: z.string().email().describe('Admin email address'),
        },
        handler: async ({ email }) => {
            const res = await axiosInstance.post('/organization/invite_admin', { email });
            return {
                success: res.data.success,
                message: res.data.success ? 'Admin invitation sent' : 'Could not send invitation',
            };
        },
    });

    useWebMCP({
        name: 'org_delete_admin',
        description: 'Remove an admin from the organisation. Always confirm before calling this.',
        inputSchema: {
            admin_id: z.string().describe('Admin ID to remove'),
        },
        handler: async ({ admin_id }) => {
            const res = await axiosInstance.delete('/organization/delete_admin', { data: { admin_id } });
            return {
                success: res.data.success,
                message: res.data.success ? 'Admin removed' : 'Could not remove admin',
            };
        },
    });

    useWebMCP({
        name: 'org_logout',
        description: 'Log out from the organisation account.',
        inputSchema: {},
        handler: async () => {
            try { await axiosInstance.post('/logout'); } catch (e) { }
            localStorage.clear();
            navigate('/');
            return { success: true };
        },
    });

    return null;
};

export default OrganisationTools;
