import * as React from 'react';
import styles from './Main.module.scss';
import { IMainProps } from './IMainProps';
import ClassRender from './Class/ClassRender';
import GraphAPITesting from './GraphAPI/GraphAPITesting';

export default class Main extends React.Component<IMainProps, {}> {
  public render(): React.ReactElement<IMainProps> {
    const {
      hasTeamsContext,
    } = this.props;

    return (
      <section className={`${styles.main} ${hasTeamsContext ? styles.teams : ''}`}>
        <div>
          <h3>Welcome to SharePoint Framework!</h3>
          <ClassRender />
          <div>
            Graph API :
          </div>
          <GraphAPITesting />
          <p>
            The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
          </p>
        </div>
      </section>
    );
  }
}
