import {
  Color,
  Colors,
  EdgeInsets,
  EdgeInsetsStep,
  SystemMouseCursor,
} from "@/abstract";
import { Key } from "@/abstract/Key";
import { Component, defineComponent, h } from "vue";
import { Column } from "./Column";
import { Container } from "./Container";
import { InkWell } from "./InkWell";
import { Padding } from "./Padding";
import { Row } from "./Row";

interface ListTileI {
  key?: Maybe<Key>;
  leading?: Maybe<Component>;
  title: Component;
  subtitle?: Maybe<Component>;
  trailing?: Maybe<Component>;
  // isThreeLine
  // dense,
  // visualDensity,
  // shape,
  contentPadding?: Maybe<EdgeInsets>;
  enabled?: Maybe<boolean>;
  onTap?: Maybe<GestureTapCallback>;
  // onLongPress,
  mouseCursor: Maybe<SystemMouseCursor>;
  selected?: Maybe<boolean>;
  focusColor?: Maybe<Color>;
  hoverColor?: Maybe<Color>;
  // focusNode,
  // autofocus = false,
  tileColor?: Maybe<Color>;
  selectedTileColor?: Maybe<Color>;
  // enableFeedback,
  // horizontalTitleGap,
  // minVerticalPadding,
  // minLeadingWidth,
}

export const ListTile = ({
  key,
  mouseCursor,
  hoverColor,
  focusColor,
  contentPadding,
  enabled,
  leading,
  onTap,
  selected,
  subtitle,
  tileColor,
  title,
  selectedTileColor,
  trailing,
}: ListTileI) => {
  const resolvedSelectedTileColor = selectedTileColor ?? Colors.indigo;
  const resolvedTileColor = tileColor ?? Colors.white;

  const tileBackgroundColor = selected
    ? resolvedSelectedTileColor
    : resolvedTileColor;
  const hasLeading = leading != null;
  const resolvedLeading = leading ?? <div />;
  const hasSubtitle = subtitle != null;
  const resolvedTrailing = () => {
    if (trailing != null) {
      return Padding({
        padding: EdgeInsets.symmetric({
          horizontal: EdgeInsetsStep.s16,
        }),
        child: trailing,
      });
    } else {
      return <div />;
    }
  };
  const resolvedSubtitle = subtitle ?? <div />;
  const resolvedTitleWidget = (() => {
    if (hasSubtitle) {
      return Column({
        children: [title, resolvedSubtitle],
      });
    } else {
      return title;
    }
  })();

  const resolvedContentWidget = (() => {
    if (hasLeading) {
      return Padding({
        padding: EdgeInsets.only({ left: EdgeInsetsStep.s16 }),
        child: resolvedTitleWidget,
      });
    } else {
      return resolvedTitleWidget;
    }
  })();

  return defineComponent({
    name: "ListTile",
    render() {
      return h(
        InkWell({
          mouseCursor,
          onTap: enabled ? onTap : null,
          focusColor,
          hoverColor,
          child: Container({
            padding: contentPadding ?? EdgeInsets.all(EdgeInsetsStep.s16),
            color: tileBackgroundColor,
            height: EdgeInsetsStep.s64,
            child: Row({
              children: [
                resolvedLeading,
                resolvedContentWidget,
                resolvedTrailing,
              ],
            }),
          }),
        })
      );
    },
  });
};
