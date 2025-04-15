/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'userManagement',
        title: "Gestion d'utilisateur",
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/users'
    },
    {
        id   : 'productManagement',
        title: "Gestion des produits",
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/product'
    },
    {
        id   : 'productManagement',
        title: "Gestion Commandes",
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/commande'
    },
    {
        id   : 'productManagement',
        title: "Gestion Factures",
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/facture'
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Examplek',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Exampled',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example&',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
