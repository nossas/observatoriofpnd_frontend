import {
  Bug,
  BugFill,
  Button,
  Diamond,
  DiamondFill,
  ExclamationTriangle,
  ExclamationTriangleFill,
  Fire,
  FireFill,
  SignPost,
  SignPostFill,
  TreeFill,
  VectorDeforestationTree,
  VectorDesmatamentoFill,
  VectorMineracao,
  VectorMineracaoFill,
  Wind,
  XDiamond,
  XDiamondFill,
} from "components/atoms";
import { Camadas, Esferas } from "services/data";
import { Divider, Flex, Select, Grid, Typography } from "antd";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import estados from "assets/data/estados.json";
import { Actions } from "services/data/types";
import { useTranslation } from "react-i18next";

const { Text } = Typography;
const { useBreakpoint } = Grid;

type ExploreProps = {
  collapsed?: boolean;
  vertical?: boolean;
};

export const Explore: FC<ExploreProps> = ({
  collapsed = false,
  vertical = true,
}) => {
  const [florestaEstadual, setFlorestaEstadual] = useState<boolean>(false);
  const [florestaFederal, setFlorestaFederal] = useState<boolean>(false);
  const [maisDesmatadasSelected, setMaisDesmatadasSelected] =
    useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<number>(-1);
  const breakpoints = useBreakpoint();
  const [gapXs, setGapXs] = useState<number>(8);
  const navigate = useNavigate({ from: "/" });
  const { t } = useTranslation();

  useEffect(() => {
    if (breakpoints.xs) {
      setGapXs(6);
    }
  }, [breakpoints]);

  const actions = [
    {
      icon:
        selectedAction === 0 ? (
          <VectorDesmatamentoFill />
        ) : (
          <VectorDeforestationTree />
        ),
      label: t('deforestation'),
      layer: Camadas.deforastationLast10Years,
      type: "ameacas",
      action: Actions.Desmatamento,
    },
    {
      icon: <Wind />,
      label: t('carbon_stock'),
      layer: Camadas.undergroundCarbonStorage,
      type: "indicadores",
      action: Actions.EstoqueDeCarbono,
    },
    {
      icon: selectedAction === 2 ? <BugFill /> : <Bug />,
      label: t('threatened_species_richness'),
      layer: Camadas.speciesDiversity,
      type: "indicadores",
      action: Actions.Biodiversidade,
    },
    {
      icon: selectedAction === 3 ? <SignPostFill /> : <SignPost />,
      label: t('rural_environmental_registry'),
      layer: Camadas.carOverlap,
      type: "ameacas",
      action: Actions.Car,
    },
    {
      icon:
        selectedAction === 4 ? <VectorMineracaoFill /> : <VectorMineracao />,
      label: t('mining'),
      layer: Camadas.mining,
      type: "ameacas",
      action: Actions.Mineracao,
    },
    {
      icon:
        selectedAction === 5 ? <FireFill /> : <Fire />,
      label: t('fire'),
      layer: Camadas.fogo,
      type: "ameacas",
      action: Actions.Fogo,
    },
  ];

  useEffect(() => {
    if (maisDesmatadasSelected) {
      setSelectedAction(-1);

      navigate({
        search: (prev) => ({ ...prev, camada: Camadas.deforastationLastMonth }),
      });
    }
  }, [maisDesmatadasSelected]);

  useEffect(() => {
    if (selectedAction !== -1) {
      setMaisDesmatadasSelected(false);
      navigate({
        search: (prev) => ({ ...prev, camada: actions[selectedAction].layer }),
      });
    }
  }, [selectedAction]);

  useEffect(() => {
    if (!maisDesmatadasSelected && selectedAction === -1) {
      navigate({
        search: (prev) => ({ ...prev, camada: undefined }),
      });
    }
  }, [maisDesmatadasSelected, selectedAction]);

  useEffect(() => {
    if (florestaFederal) {
      navigate({
        search: (prev) => ({ ...prev, esfera: Esferas.Federal }),
      });
    } else if (florestaEstadual) {
      navigate({
        search: (prev) => ({ ...prev, esfera: Esferas.Estadual }),
      });
    } else {
      navigate({
        search: (prev) => ({ ...prev, esfera: undefined }),
      });
    }
  }, [florestaEstadual, florestaFederal]);

  const categoriaEstaduais = () => {
    if (!florestaEstadual) {
      setFlorestaFederal(false);
    }
    setFlorestaEstadual(!florestaEstadual);
  };
  const categoriaFederais = () => {
    if (!florestaFederal) {
      setFlorestaEstadual(false);
    }
    setFlorestaFederal(!florestaFederal);
  };

  const maisDesmatadas = () => {
    setMaisDesmatadasSelected(!maisDesmatadasSelected);
  };

  const onSelectAction = (index: number) => {
    if (selectedAction === index) {
      setSelectedAction(-1);
    } else {
      setSelectedAction(index);
    }
  };

  const onSelectStates = (event: Array<string>) => {
    if (event.length) {
      navigate({
        search: (prev) => ({ ...prev, estados: event }),
      });
    } else {
      navigate({
        search: (prev) => ({ ...prev, estados: undefined }),
      });
    }
  };

  return (
    <>
      <Flex
        gap={gapXs}
        vertical={vertical}
        style={{ padding: "8px 8px 8px 16px" }}
      >
        <Text>
          {collapsed
            ? ""
            : t('discover_undesignated_public_forests_amazon')}
        </Text>

        <Button
          collapsed={collapsed}
          icon={<TreeFill />}
          label={t('undesignated_public_forests')}
          type="primary"
          className="botaoExploreSelected"
        />

        <Button
          collapsed={collapsed}
          icon={
            maisDesmatadasSelected ? (
              <ExclamationTriangleFill />
            ) : (
              <ExclamationTriangle />
            )
          }
          label={t('most_deforested_fpnd_last_month')}
          type={maisDesmatadasSelected ? "primary" : "default"}
          onClick={maisDesmatadas}
        />
      </Flex>

      <Flex
        gap={gapXs}
        vertical={vertical}
        style={{ padding: "8px 8px 8px 16px" }}
      >
        <Text>{collapsed ? "" : t('filter_by_category')}</Text>

        <Flex gap={gapXs} vertical={vertical ? !!collapsed : vertical}>
          <Button
            collapsed={collapsed}
            icon={florestaFederal ? <XDiamondFill /> : <XDiamond />}
            label={t('federal_forests')}
            type={florestaFederal ? "primary" : "default"}
            onClick={categoriaFederais}
          />

          <Button
            collapsed={collapsed}
            icon={florestaEstadual ? <DiamondFill /> : <Diamond />}
            label={t('state_forests')}
            type={florestaEstadual ? "primary" : "default"}
            onClick={categoriaEstaduais}
          />
        </Flex>
      </Flex>

      {!collapsed && ( // desativa Select quando menu esta collapsado
        <>
          <Flex vertical gap={gapXs} style={{ padding: "8px 8px 8px 16px" }}>
            <Text>{t('select_by_state')}</Text>

            <Select
              mode="multiple"
              allowClear
              placeholder={t('select')}
              style={{ width: "100%" }}
              onChange={onSelectStates}
              options={estados.data}
            />
          </Flex>
        </>
      )}

      <Divider
        type={vertical ? "horizontal" : "vertical"}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      />

      <Flex
        gap={gapXs}
        vertical={vertical}
        style={{ padding: "8px 8px 8px 16px" }}
      >
        <Text>{collapsed ? "" : t('threats')}</Text>

        {actions
          .filter((action) => action.type === "ameacas")
          .map((action, index) => (
            <Button
              key={index}
              collapsed={collapsed}
              type={action.action === selectedAction ? "primary" : "default"}
              icon={action.icon}
              label={action.label}
              onClick={() => onSelectAction(action.action)}
            />
          ))}
      </Flex>

      <Flex
        gap={gapXs}
        vertical={vertical}
        style={{ padding: "8px 8px 8px 16px" }}
      >
        <Text>{collapsed ? "" : t('environmental_indicators')}</Text>

        {actions
          .filter(item => item.type === "indicadores")
          .map((action, index) => (
            <Button
              key={index}
              collapsed={collapsed}
              type={action.action === selectedAction ? "primary" : "default"}
              icon={action.icon}
              label={action.label}
              onClick={() => onSelectAction(action.action)}
            />
          ))}
      </Flex>

      <Divider
        type={vertical ? "horizontal" : "vertical"}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      />
    </>
  );
};
