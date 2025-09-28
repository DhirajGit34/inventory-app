import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

// 1. Create Context
// This context will hold the state and functions for our context menu.
const MenuContext = createContext(null);

// Custom hook for easy context consumption
const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error(
      "ContextMenu components cannot be rendered outside the ContextMenu provider"
    );
  }
  return context;
};

// 2. Main ContextMenu Component (The Provider)
// This component will manage the state of the menu (open/closed, position)
// and provide it to its children via the Context API.
const ContextMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  const openMenu = (x, y) => {
    setPosition({ x, y });
    setIsOpen(true);
  };

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Effect to handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  const value = {
    isOpen,
    position,
    menuRef,
    openMenu,
    closeMenu,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

// 3. Compound Components

// ContextMenu.Trigger
// This component wraps the element that will trigger the context menu on right-click.
const Trigger = ({ children }) => {
  const { openMenu } = useMenuContext();

  const handleContextMenu = (event) => {
    event.preventDefault(); // Prevent the default browser context menu
    openMenu(event.clientX, event.clientY);
  };

  // We need to clone the child to attach the onContextMenu event handler
  return (
    <StyledToggle>
      {React.cloneElement(children, {
        onContextMenu: handleContextMenu,
      })}
    </StyledToggle>
  );
};

// ContextMenu.Content
// This is the container for the menu itself. It only renders when the menu is open.
const Content = ({ children }) => {
  const { isOpen, position, menuRef } = useMenuContext();

  if (!isOpen) return null;

  const menuStyle = {
    top: `${position.y}px`,
    left: `${position.x}px`,
  };

  return (
    <StyledList ref={menuRef} style={menuStyle}>
      {children}
    </StyledList>
  );
};

// ContextMenu.Item
// This represents a single clickable item within the context menu.
const Item = ({ children, onClick }) => {
  const { closeMenu } = useMenuContext();

  const handleClick = () => {
    onClick?.();
    closeMenu();
  };

  return (
    <li
      onMouseDown={(e) => e.stopPropagation()} // Prevent outside click handler from firing
    >
      <StyledButton onClick={handleClick}>{children}</StyledButton>
    </li>
  );
};

// ContextMenu.Separator
// A simple visual separator for grouping items.
const Separator = () => (
  <li className="h-px bg-gray-200 dark:bg-gray-700 my-1" role="separator" />
);

// 4. Assigning Compound Components as properties
ContextMenu.Trigger = Trigger;
ContextMenu.Content = Content;
ContextMenu.Item = Item;
ContextMenu.Separator = Separator;

export default ContextMenu;
