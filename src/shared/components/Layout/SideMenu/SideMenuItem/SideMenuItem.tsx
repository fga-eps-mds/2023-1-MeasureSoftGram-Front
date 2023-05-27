import React, { useRef } from 'react';

import { Box, Drawer, Tooltip } from '@mui/material';
import { useSideMenuContext } from '@contexts/SidebarProvider/SideMenuProvider';
import * as Styles from './styles';
import { useOrganizationContext } from '@contexts/OrganizationProvider';
import { useProductContext } from '@contexts/ProductProvider';
import { useRepositoryContext } from '@contexts/RepositoryProvider';

export type ContextControl = 'product' | 'organization' | 'repository';

type Props = {
  startIcon: JSX.Element;
  endIcon?: JSX.Element;
  text: string;
  tooltip: string;
  optype : string;
  openState: boolean;
  children?: JSX.Element;
  handlePath?: () => void;
  handleClose?: () => void;
  context: ContextControl;
};

function SideMenuItem(
  {
    startIcon, text, endIcon, tooltip, optype,
    openState, children, handleClose, context,
    handlePath
  }: Props) {
  const { isCollapsed } = useSideMenuContext();
  const {currentOrganization} = useOrganizationContext();
  const {currentProduct} = useProductContext();
  const {currentRepository} = useRepositoryContext()

  const itemRef = useRef();
  let checkContext = false;

  switch (context) {
    case 'organization':
      checkContext = currentOrganization && true; 
      break;

    case 'product':
      checkContext = currentOrganization && (typeof currentProduct !== undefined && typeof currentProduct !== null); 
      break;

    case 'repository':
      checkContext = currentOrganization
          && (typeof currentProduct !== undefined && typeof currentProduct !== null)
          && (currentRepository !== undefined && currentRepository !== null);
      break;

    default:
      checkContext = true;
      break;
  } 
  
  if ((optype === "drawer" || checkContext) ) { 
    return <Box onClick={handleClose}
      ref={itemRef} sx={{ marginY: '2px' }}>
      <Tooltip title={tooltip} arrow placement="left">
        <Styles.Wrapper 
          $collapsed={isCollapsed}
          onClick={handlePath}
        >
          <Styles.IconContainer>{startIcon}</Styles.IconContainer>
          {!isCollapsed &&  <>
            <>
              <Box sx={{ width: '100%', marginLeft: '10px' }}>{text}</Box>
              {endIcon && <Box sx={{ paddingRight: '10px' }}>{endIcon}</Box>}
            </>
          </>}
        </Styles.Wrapper>
      </Tooltip>
      {optype === 'drawer' && <Drawer
        anchor='left'
        open={openState}
        onClose={handleClose}
      >
        {children}
      </Drawer>}
    </Box>
  } else return null;
}

export default SideMenuItem;