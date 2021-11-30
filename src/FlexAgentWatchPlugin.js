import React from "react";
import { VERSION } from "@twilio/flex-ui";
import { FlexPlugin } from "flex-plugin";

import AgentWatchWidgetContainer from "./components/AgentWatchWidget/AgentWatchWidget.Container";
import ErrorMessageWidget from "./components/ErrorMessageWidget/ErrorMessageWidget.Container";
import { QueuesStatsView } from "@twilio/flex-ui";
import QueuesStatsView2SideLink from "./QueuesStatsView2SideLink";

import reducers, { namespace } from "./states";

const PLUGIN_NAME = "FlexAgentWatchPlugin";

export default class FlexAgentWatchPlugin extends FlexPlugin {
	constructor() {
		super(PLUGIN_NAME);
	}

	/**
	 * This code is run when your plugin is being started
	 * Use this to modify any UI components or attach to the actions framework
	 *
	 * @param flex { typeof import('@twilio/flex-ui') }
	 * @param manager { import('@twilio/flex-ui').Manager }
	 */
	init(flex, manager) {
		this.registerReducers(manager);

		flex.MainHeader.Content.add(
			<AgentWatchWidgetContainer manager={manager} key="agent-watch-widget" />,
			{
				sortOrder: -1,
				align: "end",
			}
		);

		flex.AgentDesktopView.Panel1.Content.add(
			<ErrorMessageWidget key="error-message-widget" />,
			{
				sortOrder: -1,
			}
		);

		flex.SideNav.Content.add(
			<QueuesStatsView2SideLink key="QueuesStatsView2SideLink" />
		);

		flex.ViewCollection.Content.add(
			<flex.View
				key="queues-stats2"
				name="queues-stats2"
				route={{ path: "/queues-stats2" }}
			>
				<QueuesStatsView />
			</flex.View>
		);
	}

	/**
	 * Registers the plugin reducers
	 *
	 * @param manager { Flex.Manager }
	 */
	registerReducers(manager) {
		if (!manager.store.addReducer) {
			// eslint: disable-next-line
			console.error(
				`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`
			);
			return;
		}

		manager.store.addReducer(namespace, reducers);
	}
}
